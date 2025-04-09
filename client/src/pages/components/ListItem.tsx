import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';


interface ListItemProps {
  id: string | number;
  name: string;
  description: string;
  onClick: (id: string | number) => void;
  isactive: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ id, name, description, onClick, isactive }) => {
  
  const handleItemClick = () => onClick(id);

  return (
    <li className={isactive ? 'list-item active' : 'list-item'}>
      <div className={'list-item-actions'}>
                <div>ID: <b>{id}</b></div>
                <Button onClick={handleItemClick} id={id} disabled={isactive}>
                    {isactive ? 'Active' : 'Set Active'}
                </Button>
            </div>
        <Link to={`/${id}`}>  
            <div>{name}</div>
            <div className={'list-item__description'}>{description}</div>
        </Link>
    </li>
  );
};


export default ListItem;
