import PropTypes from 'prop-types';
import Button from './Button';
const Header = ({ title, toggleAddTask, showAddTask }) => {
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button color={showAddTask ? "red" : "green"} onClick={toggleAddTask} text={showAddTask ? "Close" : "Add"}></Button>
        </header>
    )
}

//CSS in js
Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

const headingStyle = { backgroundColor: 'black', color: 'red' }

export default Header
