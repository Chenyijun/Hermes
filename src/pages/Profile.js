import React, {useEffect, useState} from 'react'
import { Avatar, DefaultAvatar } from '../components/chatComponents'
import { MainWrapper } from '../components/wrappers'
import { auth, db, storage, currentUser } from '../firebase';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { getDoc, doc, updateDoc} from '@firebase/firestore';
import { updateProfile } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Profile = () => {
	const [img, setImg] = useState('')
	const [user, setUser] = useState(currentUser);
	const navigate = useNavigate("");
	
	useEffect(() => {
			if (auth.currentUser) {
			getDoc(doc(db, 'users', auth.currentUser.uid)).then ((docSnap) => {
				if (docSnap.exists) {
					setUser(docSnap.data());
					console.log('set user', user);
				}
			});
		}
	}, []);
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
	<MainWrapper>
		<NavBar user={user}/>
		<div>
			{(user && user.avatar) ? 
				<Avatar alt='avatar'src={user && user.avatar} text={user&& user.name} />
				: <DefaultAvatar>{user && user.name}</DefaultAvatar>}
				<input 
						type='file'
						accept='image'
						onChange={(e) => setImg(e.target.files[0])}/>
				<button onClick={() => deleteImage()}>Delete Image</button>
				<p>{user && user.name || 'name'}</p>
				<p>{user && user.email || 'email'}</p>
	 </div>
 </MainWrapper>
	)
}

export default Profile