import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}



export function AuthProvider({ children }) {
    
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    } //returns a promise

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout () {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => { //3)because we only want to set the user once and that is when the page first loads
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        }) //1)firebase has its own method to create these users. Yani direk user = { id: 1, name: 'hasan', ...} diye sana bir user olusturuyor
           //2)dolayisiyla bizim bilgisayara nasil user'i olusturmasini gerektigini soylememize gerek yok
        
        return unsubscribe //4)adding a cleaner function because we want to unsubscribe whenever we are done
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
