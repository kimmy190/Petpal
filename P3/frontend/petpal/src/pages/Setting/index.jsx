import { useUserContext } from "../../contexts/UserContext";
import SeekerSetting from "../../components/SeekerSetting";
import ShelterSetting from "../../components/ShelterSetting";

const Setting = () => {
    const { user, loading } = useUserContext();

    if(user){
        console.log(user); 
        console.log()
        if (user.hasOwnProperty('shelter')) {
        // shelter 
            return(
                <>
                <ShelterSetting /> 
                </>
            );

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