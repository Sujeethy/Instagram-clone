import React,{useEffect,useState} from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";
import StatusPopup from "./ProfileStatus";
import AddStatus from "./AddStatus";
import {getStatus} from "../../hooks/useAddStatus";


const ProfileHeader = () => {
	const { userProfile } = useUserProfileStore();
	const authUser = useAuthStore((state) => state.user);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);
	const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
	const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;
	const [openStatus, setOpenStatus] = useState(false);
	const [openAddStatus, setOpenAddStatus] = useState(false);
	const [images, setImages] = useState([]);
  
	useEffect(() => {
	  const fetchStatus = async () => {
		try {
		  const statusImages = await getStatus(authUser.uid);
		  setImages(statusImages); // Ensure this is an array of valid URLs
		} catch (error) {
		  console.error('Error fetching status images:', error);
		}
	  };
  
	  fetchStatus();
	}, [authUser.uid]);
  
	return (
	  <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
		{/* Avatar and Profile Info */}
		<AvatarGroup size={{ base: "xl", md: "2xl" }} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
		  <Box
			borderWidth="3px"
			borderColor={images.length > 0 ? "blue.500" : "transparent"}
			borderRadius="full"
			p="2px"
			bg="black"
			onClick={() => setOpenStatus(true)}
		  >
			<Avatar src={userProfile.profilePicURL} boxSize="full" cursor="pointer" />
		  </Box>
		</AvatarGroup>
  
		{/* Status Popup */}
		<StatusPopup
		  isOpen={openStatus}
		  onClose={() => setOpenStatus(false)}
		  images={images}
		  interval={3000}
		/>
  
		{/* Profile Details */}
		<VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
		  <Flex gap={4} direction={{ base: "column", sm: "row" }} justifyContent={{ base: "center", sm: "flex-start" }} alignItems={"center"} w={"full"}>
			<Text fontSize={{ base: "sm", md: "lg" }}>{userProfile.username}</Text>
			{visitingOwnProfileAndAuth && (
			  <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
				<Button
				  bg={"whiteAlpha.400"}
				  color={"white"}
				  _hover={{ bg: "whiteAlpha.300" }}
				  size={{ base: "xs", md: "sm" }}
				  onClick={onOpen}
				>
				  Edit Profile
				</Button>
				<Button
				  bg={"whiteAlpha.400"}
				  color={"white"}
				  _hover={{ bg: "whiteAlpha.300" }}
				  size={{ base: "xs", md: "sm" }}
				  onClick={() => setOpenAddStatus(true)}
				>
				  Add Status
				</Button>
			  </Flex>
			)}
			{visitingAnotherProfileAndAuth && (
			  <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
				<Button
				  bg={"blue.500"}
				  color={"white"}
				  _hover={{ bg: "blue.600" }}
				  size={{ base: "xs", md: "sm" }}
				  onClick={handleFollowUser}
				  isLoading={isUpdating}
				>
				  {isFollowing ? "Unfollow" : "Follow"}
				</Button>
			  </Flex>
			)}
		  </Flex>
  
		  {/* Other Profile Info */}
		  <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
			<Text fontSize={{ base: "xs", md: "sm" }}>
			  <Text as="span" fontWeight={"bold"} mr={1}>{userProfile.posts.length}</Text>
			  Posts
			</Text>
			<Text fontSize={{ base: "xs", md: "sm" }}>
			  <Text as="span" fontWeight={"bold"} mr={1}>{userProfile.followers.length}</Text>
			  Followers
			</Text>
			<Text fontSize={{ base: "xs", md: "sm" }}>
			  <Text as="span" fontWeight={"bold"} mr={1}>{userProfile.following.length}</Text>
			  Following
			</Text>
		  </Flex>
		  <Text fontSize={"sm"} fontWeight={"bold"}>{userProfile.fullName}</Text>
		  <Text fontSize={"sm"}>{userProfile.bio}</Text>
		</VStack>
		
		{/* Modals for Edit Profile and Add Status */}
		{isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
		{openAddStatus && <AddStatus isOpen={openAddStatus} onClose={() => setOpenAddStatus(false)} />}
	  </Flex>
	);
  };
  
  export default ProfileHeader;
  