import { useState, useEffect, useCallback } from 'react';

function useLoadData(ref, setLoading, setError, queryOption) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(queryOption.page);
  
    const loadData = useCallback( async () => {

        setLoading(true);

        try {
            const url = `https://api.github.com/gists/public?since=${queryOption.since}&per_page=${queryOption.per_page}&page=${currentPage}`;
            await fetch(url).then(response => {
                if(response.status >= 400){
                    setError("Unexpected Server Error");
                    return response.json();
                }
                if (response.ok) {
                    return response.json();
                }
                return response.json();
            })
            .then(data2 => {
                // if(data2.message){
                //     // setError(data2.message); 
                //     // throw new Error(data2.message);
                // }
                if(!data2.message) {
                    return setData([...data, ...data2]);
                };
                 throw new Error(data2.message);

            });
            setLoading(false);
            setCurrentPage(currentPage+1);
        
        } catch (error) {
            setError(error);
        }   
    },[currentPage,data, setLoading, setError, queryOption]);

    useEffect(()=>{
     
        const container = ref.current;

        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){                
                loadData();
                return;
            } 
                       
        },{rootMargin: '500px'});

        if (container) {
            observer.observe(container);
        }

        return () => {
            observer.unobserve(container);
        };
       
    },[ref, data, loadData]);

    return data;
}

export default useLoadData;