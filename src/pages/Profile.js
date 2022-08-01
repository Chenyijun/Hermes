import React, {useEffect, useState} from 'react'
import Avatar from '../components/Avatar';
import { auth, db, storage } from '../firebase';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { getDoc, doc, updateDoc} from '@firebase/firestore';
import { updateProfile, onAuthStateChanged } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../firebase';
import { WhiteText } from '../components/mainComponents';


const Profile = ({user}) => {
	const [img, setImg] = useState('')
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate("");

	useEffect(() => {
		if (img){
			const uploadImg = async () => {
			const imgRef = ref( storage, `avatar/${new Date().getTime()} - ${img.name}`)
			
			try {
				if (user && user.avatarPath) {
					await deleteObject(ref(storage, user.avatarPath));
				}
				const snap = await uploadBytes(imgRef, img);
				console.log("snap", snap)
				const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
				console.log("url", url)

				
			await updateDoc(doc(db, "users", auth.currentUser.uid), {
					avatar: url,
					avatarPath: snap.ref.fullPath,
				});

				updateProfile(auth.currentUser, {
					photoURL: url
				})

				setImg("");
			} catch (err) {
				console.log(err.message)
			}
		}
		uploadImg();
	};
}, [img]);

const deleteImage = async () => {
  try {
    const confirm = window.confirm("Delete avatar?");
    if (confirm) {
      await deleteObject(ref(storage, user.avatarPath));

      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        avatar: "",
        avatarPath: "",
      });
			navigate("/", { replace: true})
      // navigate.replace("/");
    }
  } catch (err) {
    console.log(err.message);
  }
};

return(
	<>
		{isLoading ? (<div>Loading</div>)
		: (<div>
				<Avatar user={user} size='large'/>
				<input 
						type='file'
						accept='image'
						onChange={(e) => setImg(e.target.files[0])}/>
				<button onClick={() => deleteImage()}>Delete Image</button>
				<WhiteText><b>First Name:</b> {user?.firstName || 'first name'}</WhiteText>
				<WhiteText><b>Last Name:</b> {user?.lastName || 'last name'}</WhiteText>
				<WhiteText><b>Email:</b> {user?.email || 'email'}</WhiteText>
				<button onClick={logOut}>Logout</button>
			</div>)
		}
 </>
	)
}

export default Profile