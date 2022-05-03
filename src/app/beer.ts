export interface Beer {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  // volume: BoilVolume;
  // boil_volume: BoilVolume;
  // method: Method;
  // ingredients: Ingredients;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
  favorite: boolean;
}

export interface ErrorModel {
  statusCode: number;
  error: string;
  message: string;
}
