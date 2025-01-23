import {useEffect} from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import {useAuthContext} from '../hooks/useAuthContext'

import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/Workoutform'

const Home = () => {
    const {workouts, dispatch} = useWorkoutContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts`, {
                headers: {
                    'Authorization': `Bearer ${user}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        if (user) {
            fetchWorkouts()
        }

     } , [dispatch, user])
    
    return (
        <div className="home">
            <div className = 'workouts'>
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home