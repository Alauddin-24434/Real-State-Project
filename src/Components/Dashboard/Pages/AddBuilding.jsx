import { useState } from "react";
import { imageUpload } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";
import AddRoomForm from "../../Form/AddRoomForm";
import { addHouse } from "../../../api/house";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AddBuilding = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()
    const [uploadButonText, setUploadButonText] = useState('Upload Image')
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const form = event.target;
        const location = form.location.value;
        const title = form.title.value;
        const bedrooms = parseInt(form.bedrooms.value, 10);
        const bathrooms = parseInt(form.bathrooms.value, 10);
        const image = form.image.files[0]
        const description = form.description.value;
        const frange = parseInt(form.frange.value, 10);
        const trange = parseInt(form.trange.value, 10);
        const agent = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,

        }
        const image_url = await imageUpload(image)
        const houseInfo = {
            location,
            title,
            bedrooms,
            bathrooms,
            description,
            frange,
            trange,
            agent,
            image: image_url?.data?.display_url,
            status:"pending"
            


        }

        try {
            const data = await addHouse(houseInfo)
            if(data){
                toast.success('Added House Successfully');
            }
            navigate('/dashboard/agent-list')
        }
        catch (err) {
            console.log(err)
            toast.success(err.message);
        }
        finally {
            setLoading(false)
        }

        console.table(houseInfo)

    }
    // handle imageButton title name change 
    const handleImageChange = (image) => {
        setUploadButonText(image?.name)
    }
    return (
        <div>
            <AddRoomForm handleSubmit={handleSubmit}
                handleImageChange={handleImageChange}
                loading={loading}
                uploadButtonText={uploadButonText}
            />
        </div>
    );
};

export default AddBuilding;