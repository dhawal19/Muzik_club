import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSlots } from "../../state";
import SlotWidget from "./SlotWidget";

const SlotsWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const slots = useSelector((state) => state.slots);
  const token = useSelector((state) => state.token);

//   const getSlots = async () => {
//     const response = await fetch(`http://localhost:3500/slot/`, {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await response.json().toArray();
//     dispatch(setSlots({ slots: data }));
//   };

  const getUserSlots = async () => {
    const response = await fetch(
      `http://localhost:3500/slot/`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    const userSlots = data.filter((slot) => slot.members.length > 0&& slot.members.indexOf(userId) !== -1 );
    dispatch(setSlots(userSlots));
  };
  console.log();

    useEffect(() => {
      getUserSlots();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {Array.isArray(slots)? (<SlotWidget slots = {slots}/>) : (<div>
                <h1> No slots</h1>
            </div>)}
        
        </>)

}

export default SlotsWidget;