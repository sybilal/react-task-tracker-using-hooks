import { useForm } from 'react-hook-form';

const AddTask = ({ onAdd }) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const onSubmit = (reqObj) => {
        console.log('onSubmit Called')
        onAdd(reqObj);
        reset();
    };

    return (
        <form className="add-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" placeholder="Add Task" name="text"
                    ref={register(
                        {
                            required: 'Text is required',
                            minLength: { value: 3, message: 'Too small' },
                            maxLength: { value: 20, message: 'Too large' },
                        }
                    )}
                />
                {errors.text && <span className="error">{errors.text.message}</span>}
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input type="datetime-local" placeholder="Add Day & Time" name="day"
                    ref={register({ required: true })} />
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type="checkbox" placeholder="Toggle Reminder" name="reminder"
                    ref={register({})} />
            </div>

            <input type="submit" value="Save Task" className="btn btn-block" />
        </form>
    )
}

export default AddTask
