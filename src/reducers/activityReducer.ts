import { Activity } from "../types";

{
  /* ​‌‍‍⁡⁢⁣⁣NOTA ==> Esto es lo que se va a despachar (dispatch) ⁡⁢⁣⁣y llamar en el otro lado⁡⁡​ */
}
export type ActivityActions =
  | { type: "save-activity"; payload: { newActivity: Activity } }
  | { type: "set-activeId"; payload: { id: Activity["id"] } } 
  | { type: "delete-activity"; payload: { id: Activity["id"] } } 

{
  /* ⁡⁢⁣⁣​‌‍‍NOTA ==> Aquí estoy definiendo que va a ser un array de objetos de tipo Activity​⁡ */
}
export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};
const localStorageActivities = (): Activity[]=>{
  const activities = localStorage.getItem('activities')
  return activities ? JSON.parse(activities):[]
}

{
  /* ​‌‍‍⁡⁢⁣⁣NOTA ==> Aquí inicializo el reducer y le digo que será de tipo array de objetos de tipo activity⁡​ */
}
export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};
{
  /* ​‌‍‍⁡⁢⁣⁣NOTA ==> El reducer consta de 2 partes, el state que es como inicia y el action⁡, ⁡⁢⁣⁣el action puede ser action.type o action.payload
el type será el tipo para decir cual es y el payload sera enviarle el payload​ ⁡*/
}
export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    let updatedActivities: Activity[] = [];

    if (state.activeId) {
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }
    return {
      ...state,
      activities: updatedActivities,
      activeId: "",
    };
  }
  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }
  if(action.type === "delete-activity"){
    return{
      ...state,
      activities:state.activities.filter(activity=>activity.id!==action.payload.id)
    }

  }
  return state;
};

{
  /* ⁡⁢⁣⁣​‌‍‍NOTA ==> 
1º Define el type  que va a ser tanto en el index.ts como aqui
2º Inicializa el initialState y fija el tipo
3º Crea el reducer con el state y el action
4º Crea el action​⁡
 */
}
