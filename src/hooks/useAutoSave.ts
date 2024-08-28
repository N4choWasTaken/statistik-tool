import { useEffect, useRef, useState } from "react";

export default function useAutoSave(storageId: string, data: string, delay = 1000) {
    const prevData = useRef(data);
    const [hasDataChanged, setHasDataChanged] = useState(false);

    useEffect(() => {
        if (data !== prevData.current) {
            prevData.current = data;
            setHasDataChanged(true);
        }
    }, [data]);

    useEffect(() => {
        if (!hasDataChanged) {
            return;
        }
        const timeoutId = setTimeout(() => {
            localStorage.setItem(storageId, data);            
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        }
  }, [delay, data, storageId, hasDataChanged]);
}