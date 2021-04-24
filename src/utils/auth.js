import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export const signUpWithEmail = async (email, password, setCurrentAuth, setEmailError, setPasswordError) => {
    auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
        createDefaultUser(user.user.uid)
        setCurrentAuth(user.user)
    }).catch(err => {

        let error = err.message
        console.log('authApi signUpWithEmail failed error', error)

        let message = null
        if (error.includes('email')) {
            if (error.includes('invalid-email')) {
                message = 'Invalid email address'
            }
            if (error.includes('email-already-in-use')) {
                message = 'Email already exists'
            }
            setEmailError(message)
        }

        if (error.includes('password')) {
            message = 'Password must be at least 6 characters'
            setPasswordError(message)
        }
    })
}

export const loginWithEmail = async (email, password, setCurrentAuth, setEmailError, setPasswordError) => {
    auth().signInWithEmailAndPassword(email, password)
    .then(user => {
        setCurrentAuth(user.user)
    }).catch(err => {

        let error = err.message
        console.log('authApi loginWithEmail failed error', error)

        let message = null
        if (!error.includes('password')) {
            if (error.includes('user-not-found')) {
                message = 'User not found'
            }
            if (error.includes('user-disabled')) {
                message = 'User account has been disabled'
            }
            if (error.includes('invalid-email')) {
                message = 'Invalid email address'
            }
            setEmailError(message)
        }

        if (error.includes('password')) {
            message = 'Incorrect password'
            setPasswordError(message)
        }
    })
}

export const logout = (setCurrentAuth) => {
    auth().signOut()
    .then(() => {
        setCurrentAuth(null)
    })
}

export const forgotPassword = (email, func) => {
    auth().sendPasswordResetEmail(email).then(function() {
        // Email sent.
        func(true)
      }).catch(function(error) {
        // An error happened.
        console.log('forgotPassword error', error)
        func(false)
      });
}

//TEMPORARY
const createDefaultUser = (uid) => {
    firestore().collection('users').doc(uid)
    .set({
        causes: [],
        skills: [],
        name: null,
        phone: null,
        dob: null,
        zipCode: null,
        gender: null,
        bio: 'Default bio until we finish onboarding setup',
        followers: 0,
        following: 0
    })
}

export const getUser = async (userId, setCurrentUser) => {
  
    firestore().collection('users').doc(userId)
    .get().then(documentSnapshot => {
  
      //check if user active here
      if (documentSnapshot.exists) {
        console.log('authApi getUser exists', documentSnapshot.data())
        let user = {
            id: userId,
            ...documentSnapshot.data()
        }
        setCurrentUser(user)
      } else {
        console.log('authApi getUser doesnt exist')
        setCurrentUser(null)
      }
      
          
    });
  
}