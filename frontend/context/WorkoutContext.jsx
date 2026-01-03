import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext()

export const workoutReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts] // adding new workout 
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) =>
                    w._id !== action.payload._id)
            }
        case 'UPDATE_WORKOUT':
            return {
                workouts: state.workouts.map((w) =>
                    w._id === action.payload._id ? action.payload : w
                )
            }

        default:
            return state
    }

}

export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutReducer, {
        workouts: []
    })



    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
}