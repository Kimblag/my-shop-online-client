import { Navigate } from "react-router-dom"


const ProtectedRoute = ({ isAuth, children }: { isAuth: boolean, children: JSX.Element }) => {
    return isAuth ? children : <Navigate to='/' />
}

export default ProtectedRoute