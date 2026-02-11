import { useState } from "react";
import { clearUser, getUser, saveUser } from "../util/authStorage";
import { AuthContext } from "./authContext";
import { useEffect } from "react";

console.log("AUTH INIT getUser():", getUser());


export function AuthProvider({ children }) {
    
    const [user, setUser] = useState(() => getUser());
    
    useEffect(() => {
        console.log("Data User : ", user);
    }, [user]);

    const register = ({ fullName, email, password }) => {
        const newUser = { fullName, email, password, createdAt: new Date().toISOString() };
        saveUser(newUser);
        setUser(newUser);
    };
    

    const login = ({ email, password }) => {
        const existing = getUser();
        if (!existing) return { ok: false, message: "Akun belum terdaftar" };
        if (existing.email !== email || existing.password !== password) {
            return { ok: false, message: "Email / password salah" };
        }
        setUser(existing);
        return { ok: true };
    };

    const logout = () => {
        clearUser();
        setUser(null);
    };

    const updateProfile = (updates) => {
        const current = getUser();
        if (!current) return;
        const updated = { ...current, ...updates };
        saveUser(updated);
        setUser(updated);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}
