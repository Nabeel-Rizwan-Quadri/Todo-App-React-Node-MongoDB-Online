import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Item({ text, remove, update }) {
    return (
        <div className="item">
            <div className="text">{text}</div>
            <div className="icons" style={{ cursor: 'pointer' }}>
                <DeleteIcon onClick={remove} />
                <EditIcon onClick={update} />
            </div>
        </div>
    )
}

export default Item