import React, { useState, useEffect } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);

  useEffect(() => {
    setTitle(workout.title);
    setLoad(workout.load);
    setReps(workout.reps);
  }, [workout, showModal]);

  const handleDelete = async () => {
    if (!user) return;

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    const updatedWorkout = { title, load, reps };

    const patchResponse = await fetch('/api/workouts/' + workout._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(updatedWorkout),
    });

    if (patchResponse.ok) {
      // ✅ Fetch all workouts again after update
      const getAllResponse = await fetch('/api/workouts', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const allWorkouts = await getAllResponse.json();

      if (getAllResponse.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: allWorkouts });
        setShowModal(false);
      }
    }
  };

  return (
    <>
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg):</strong> {workout.load}
        </p>
        <p>
          <strong>Reps:</strong> {workout.reps}
        </p>
        <p>
          <strong>Created:</strong>{' '}
          {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
        </p>
        <button className="update-btn" onClick={() => setShowModal(true)}>
          Edit
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Edit Workout</h3>
            <form onSubmit={handleUpdate}>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label>Load (kg)</label>
              <input
                type="number"
                value={load}
                onChange={(e) => setLoad(e.target.value)}
                required
              />

              <label>Reps</label>
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                required
              />

              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkoutDetails;
