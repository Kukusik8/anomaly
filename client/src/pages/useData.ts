import { useEffect, useState } from 'react';

function useData() {
	const [items, setItems] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);
	
	function fetchItems() {
		setIsRefreshing(true)
		fetch(`${process.env.API_URL}/items`)
			.then(res => res.json())
			.then(data => setItems(data))
			.catch(err => {
				console.error('Failed to fetch items', err);
			})
			.finally(() => {
				setLoading(false);
				setIsRefreshing(false);
			})
	}
	
	useEffect(() => {
		fetchItems();
		const refreshIterval = setInterval(fetchItems,5000)
		return () => clearInterval(refreshIterval)
	}, []);
	
	return {items, loading, isRefreshing};
}

export default useData;
