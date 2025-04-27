export interface PizzaComponentProps {
    id: number;
    name: string;
    image_url: string;
    ingredients: string[];
    price: number;
    categorie?: string;
    features?: Record<string, boolean>;
}
