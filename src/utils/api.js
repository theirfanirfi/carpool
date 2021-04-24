import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
// import * as ImagePicker from 'expo-image-picker';


/** IMAGES */
// export const launchCamera = async () => {
//   try {
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.4,
//       base64: true,
      
//     });
//     if (!result.cancelled) {
//       //console.log(result.uri)
//       return result
//     } else {
//       return null
//     }

//   } catch (E) {
//     console.log(E);
//     return null
//   }
// }

// export const launchImageLibrary = async () => {
//   try {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.4,
//       base64: true,
      
//     });
    
//     if (!result.cancelled) {
//       //console.log(result.uri)
//       return result
//     } else {
//       return null
//     }

//   } catch (E) {
//     console.log(E);
//     return null
//   }
// }

export const uploadProfilePicture = (image, setLoading) => {

    const uid = auth().currentUser.uid
    const storage = firebase.storage();
    let profilePic = storage.ref().child('profilePictures/'+uid+'.jpg');
  
    var metadata = {
      cacheControl: 'max-age=31536000'
    }
  
    profilePic.putFile(image, metadata).then(snapshot => {
      setLoading(false)
    }).catch(error => {
      console.log('utils uploadProfilePicture error ', error)
      setError()
    })
    
}
  
export const getProfilePicture = async (uid, setProfilePic) => {

  const storage = firebase.storage();
  const profilePic = storage.ref().child('profilePictures/'+uid+'.jpg');
  profilePic.getDownloadURL().then(url => {
    console.log('got profilePicture', url)
    setProfilePic(url)
  }).catch(err => {
    console.log('api getProfilePicture Error: ', err)
    setProfilePic(null)
  })

}

/** TEXT SEARCHES */
export const exploreSearch = (searchText, categories, selectedCategory, setResults) => {

  
  if (selectedCategory) {
    switch (categories) {
      case 'Causes':
      break
      case 'Actions':
      break
      case 'Organizations':
      break
      case "Community":
        console.log('search changed', selectedCategory, categories)
        docRef = firestore().collection('users').where('name', '>=', searchText)
      break
    }
    firestore().collection('users').where('name', '>=', searchText).get()
    .then(querySnapshot => {
      let users = []
      querySnapshot.forEach(doc => {
        console.log(doc.data())
        let user = {
          ...doc.data(),
          id: doc.id
        }
        users.push(user)
      })
      setResults(users)
    })
  } else {
    console.warn('api exploreSearch no selectedCategory')
  }
}


/** USER SPECIFIC */

export const updateUser = async (userData, saveSuccessful) => {
  const uid = auth().currentUser.uid
  firestore().collection('users').doc(uid)
  .update(userData)
  .then(() => {
    saveSuccessful()
  })
  .catch(e => {
    console.log('api updateUser error: ', e)
  })
}

export const checkFollowStatus = async (userId, setFollowing) => {
  
  const uid = auth().currentUser.uid
  console.log('test', `${uid}-${userId}`)
  firestore().collection('user_following').doc(`${uid}-${userId}`)
  .get().then(doc => {
    console.log(doc.exists)
    setFollowing((doc.exists && doc.data().active))   
  });

}

export const updateFollowStatus = async (userId, following, setFollowing) => {
  const uid = auth().currentUser.uid
  firestore().collection('user_following').doc(`${uid}-${userId}`)
  .set({
    active: !following,
    follower: uid,
    following: userId,
    lastUpdated: new Date()
  })
  .then(doc => {
    setFollowing(!following)   
  });
}

export const getFollowers = async (searchText, setUsers) => {
  const uid = auth().currentUser.uid
  let query = firestore().collection('user_following').where('following', '==', uid).where('username', '>=', searchText).where('username', '<=', searchText+'z').limit(20)
  if (searchText === '') query = firestore().collection('user_following').where('following', '==', uid).limit(20)
    query.get().then(querySnapshot => {

      let users = []
      querySnapshot.forEach(doc => {
        let user = {
          ...doc.data(),
          id: doc.id
        }
        users.push(user)
      })

      console.log('api getFollowers count', users.length)
      setUsers(users)
            
    });
}

export const getFollowing = async (searchText, setUsers) => {
  const uid = auth().currentUser.uid
  let query = firestore().collection('user_following').where('following', '==', uid).where('username', '>=', searchText).where('username', '<=', searchText+'z').limit(20)
  if (searchText === '') query = firestore().collection('user_following').where('follower', '==', uid).limit(20)
    query.get().then(querySnapshot => {

      let users = []
      querySnapshot.forEach(doc => {
        let user = {
          ...doc.data(),
          id: doc.id
        }
        users.push(user)
      })

      console.log('api getFollowing count', users.length)
      setUsers(users)
            
    });
}

/** CAUSES */
export const getCauses = async (setCauses) => {
  firestore().collection('causes').orderBy('lowercaseName', 'asc')
  .get().then(querySnapshot => {
    let causes = []
    querySnapshot.forEach(doc => {
      causes.push({
        id: doc.id,
        ...doc.data()
      })
    })
    setCauses(causes)
  }).catch((error) => {
    console.log('getCauses err', error)
  })
}

/** SKILLS */
export const getSkills = async (setSkills) => {
  firestore().collection('skills').orderBy('lowercaseName', 'asc')
  .get().then(querySnapshot => {
    let skills = []
    querySnapshot.forEach(doc => {
      skills.push({
        id: doc.id,
        ...doc.data()
      })
    })
    console.log('test')
    setSkills(skills)
  }).catch((error) => {
    console.log('getSkills err', error)
  })
}