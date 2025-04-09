import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type ItemType = {
  id: number;
  name: string;
  description: string;
};

function SinglePage() {
  const { id } = useParams();
  const [item, setItem] = useState<ItemType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    fetch(`${process.env.API_URL}/items/${id}`)
      .then(res => {
        if(!res.ok) {
          throw new Error(`Failed to fetch ${id}`)
        }
        return res.json()
      })
      .then(data => setItem(data))
      .catch(err => {
        console.error('Failed to fetch item', err);
        setError('Cannot load item data')
      })
      .finally(() => setLoading(false))
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  if (!item) {
    return <div>No item found.</div>;
  }

  return (
    <div className="detail">
        <Link to={'/'}>Go Back</Link>
      <h2>Item Details</h2>
      <p>ID: {item.id}</p>
      <p>Name: {item.name}</p>
      <p>Description: {item.description}</p>
    </div>
  );
}

export default SinglePage;
