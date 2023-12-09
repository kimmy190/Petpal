import { useUserContext } from "../../contexts/UserContext";
import SeekerSetting from "../../components/SeekerSetting";
import ShelterSetting from "../../components/ShelterSetting";

const Setting = () => {
    const { user, loading } = useUserContext();

    if (user.shelter) {
        return(
            <ShelterSetting />
        );
    } else {
        return(
            <SeekerSetting/>
        );
    }
}

export default Setting; 