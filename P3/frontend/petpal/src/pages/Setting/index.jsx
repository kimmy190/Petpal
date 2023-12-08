import { useUserContext } from "../../contexts/UserContext";
import SeekerSetting from "../../components/SeekerSetting";

const Setting = () => {
    const { user, loading } = useUserContext();

    if(user){
        if (user.hasOwnProperty('shelter')) {
        // shelter 

        } else {
            // seeker 
            return(
                <>
                <SeekerSetting/> 
                </>
            );
            
        }
    }
    
}
export default Setting; 