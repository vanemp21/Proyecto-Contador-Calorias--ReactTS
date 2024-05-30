import {v4 as uuidv4 } from 'uuid';
import { Dispatch, useEffect, useState } from "react";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions,ActivityState } from "../reducers/activityReducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}
export default function Form({dispatch,state}:FormProps) {
  const initialState:Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
  }
  const [activity, setActivity] = useState<Activity>(initialState);

useEffect(()=>{
if(state.activeId){
 const selectedActivity = state.activities.filter(stateActivity=>stateActivity.id === state.activeId)[0]
 setActivity(selectedActivity)
  
}
},[state.activeId])
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    {
      /* ⁡⁢⁣⁡⁢⁣⁣​‌‍‍NOTA ==> Con el e.target.id le dice a que estado de los 3 del objeto escribir y el qué
    ya que en el onchange hay que ponerlo porque el value define un valor estático​⁡⁡ */
    }
    {
      /* ​‌‍‍⁡⁢⁣⁣NOTA ==> Hay que comprobar si es numero o string, si el target id contiene categoria o caloria va a ser numero
    y abajo lo convierte en numero en caso de que no lo sea con +e.target.value⁡ ​*/
    }
    const isNumberField = ["category", "calories"].includes(e.target.id);
 

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
   
  };
  const isValidActivity = ()=>{
    const { name, calories} = activity
    return name.trim()!=='' && calories>0
  }
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      dispatch({type: "save-activity", payload: {newActivity: activity}  })
      setActivity({...initialState,
        id:uuidv4()
      })
  }
  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría:
        </label>
        <select
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          type="text"
          id="name"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input
          type="number"
          id="calories"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorías ej. 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <input disabled={!isValidActivity()}
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed"
        value={activity.category ===1?'Guardar Comida':'Guardar Ejercicio'}
      />
    </form>
  );
}
