export const getusers = async()=>{

const res=await fetch('http://localhost:5000/docter');
const data=await res.json();
return data;

}



