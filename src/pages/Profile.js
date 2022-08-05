import React, {useEffect, useState} from 'react'
import Avatar from '../components/Avatar';
import { auth, db, storage } from '../firebase';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { getDoc, doc, updateDoc, setDoc} from '@firebase/firestore';
import { updateProfile, onAuthStateChanged } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../firebase';
import { SettingsForm, WhiteText } from '../components/mainComponents';
import { ProfileAvatarWrapper, SettingsFormWrapper, SettingsWrapper } from '../components/wrappers';


const Profile = ({user}) => {
	const [img, setImg] = useState('')
	const [isLoading, setIsLoading] = useState(false);
	const [firstName, setFirstName] = useState(user?.firstName)
	const [lastName, setLastName] = useState(user?.lastName)
	const [email, setEmail] = useState(user?.email)

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

const updateUserProfile = async () => {
	console.log('firstName', firstName)
	console.log('uid', auth.currentUser.uid)
	await setDoc(doc(db, "users", auth.currentUser.uid), {
		firstName: firstName,
		lastName: lastName,
		email: email,
	});
}

return(
	<>
		{isLoading ? (<div>Loading</div>)
		: (<SettingsWrapper>
				<ProfileAvatarWrapper>
					<Avatar user={user} size='large'/>
					<div>
					<input 
							type='file'
							accept='image'
							onChange={(e) => setImg(e.target.files[0])}/>
					{user?.avatarPath && <button onClick={() => deleteImage()}>Delete Image</button>}
					</div>
				</ProfileAvatarWrapper>
				<br/>
				<form onSubmit={updateUserProfile}>
					<SettingsFormWrapper>
						<WhiteText>
							<b>First Name:</b>
						</WhiteText>
						<input
							type='text'
							value={firstName}
							onChange={(e)=>setFirstName(e.target.value)} />
						<WhiteText>
							<b>Last Name:</b>
						</WhiteText>
						<input
							type='text'
							value={lastName}
							onChange={(e)=>setLastName(e.target.value)} />
						<WhiteText>
							<b>Email:</b>
						</WhiteText>
						<input
							type='text'
							value={email}
							onChange={(e)=>setEmail(e.target.value)} />
					</SettingsFormWrapper>
					<button type="submit" disabled={!firstName || !lastName || !email}>Update</button>
				</form>
				<br /> <br/>
				<button onClick={logOut}>Logout</button>
			</SettingsWrapper>)
		}
 </>
	)
}

export default Profile