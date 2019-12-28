import axios from 'axios';

const instacnce =axios.create({
    baseURL: "https://react-burger-56951.firebaseio.com/"
});

export default instacnce;