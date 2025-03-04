import React ,{useEffect}from "react";
import { useSelector,useDispatch } from "react-redux";
import { getTransactionDetailAction } from "../../../Action/userAction";

export default function Transaction({}){
    const dispatch=useDispatch()
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });

    const { data: getTransactionDetail } = useSelector((state) => {
        return state.getTransactionDetail;
      });
// console.log(getTransactionDetail)

  useEffect(() => {
    // dispatch(getAllUserAction())
    //have to protect for agent
    if (medata?.user?.Role === "Owner") { 
    
      dispatch(getTransactionDetailAction)
    }
  }, []);
  console.log(medata,"jg")
return(
    <>

    helloxhbcjhdsbhjsbjhvsdcjjbsck,sdbc
    </>
)

}