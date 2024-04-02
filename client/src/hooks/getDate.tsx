import {useEffect, useState} from 'react'

const getDate = () => {

  const [dateArray, setDateArray] = useState<Date[]>([]);


    useEffect(() => {
        const startDate = new Date('2010-01-01');
        const currentDate = new Date();
    
        const generateDateArray = async () => {
          const tempArray = [];
          let currentDatePointer = startDate;
    
         
            while (currentDatePointer <= currentDate) {
                await tempArray.push(new Date(currentDatePointer));
                await currentDatePointer.setMonth(currentDatePointer.getMonth() + 1);
            }
    
          return tempArray;
        };

        generateDateArray().then(date => setDateArray(date))
        
    }, []);

  return {dateArray}
}

export default getDate