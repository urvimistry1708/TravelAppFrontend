import { ReactNode, createContext, useContext, useState } from "react";


const initialValue: string =  "National Parks";

const CategoryContext = createContext<{ hotelCategory: string; setHotelCategory: React.Dispatch<React.SetStateAction<string>> } | undefined>({
    hotelCategory:initialValue,
    setHotelCategory:()=>{}
});

const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const [hotelCategory, setHotelCategory] = useState<string>(initialValue);

    return (
        <CategoryContext.Provider value={{ hotelCategory, setHotelCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

const useCategory = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategory must be used within a CategoryProvider");
    }
    return context;
};

export { useCategory, CategoryProvider };