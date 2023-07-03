import Cookies from 'js-cookie';
import PredictionProps from '@models/prediction'
import { getPreferenceFromPred } from '@services/helpers/prediction';

export class CookieHandler {
  static getCookie(name: string): string | undefined {
    return Cookies.get(name);
  }

  static setCookie(name: string, value: string, expires?: number | Date): void {
    Cookies.set(name, value, { expires });
  }

  static removeCookie(name: string): void {
    Cookies.remove(name);
  }

  static getPredictions(): PredictionProps[] | null {
    const matches = Cookies.get('matches');
    if(matches){
      return JSON.parse(matches) as PredictionProps[];
    }
    return null;
  }
  static insertPrediction(pred: PredictionProps): void {
    const matches = Cookies.get('matches');
    let objects: PredictionProps[] = [];
    
    if (matches){
      objects = JSON.parse(matches) as PredictionProps[];
      const desiredIndex = objects.findIndex(match=> match.id === pred.id)
      if (desiredIndex === -1){
        objects.push(pred);
      }else { // object found
        objects[desiredIndex].pred = pred.pred;
        objects[desiredIndex].title = pred.title;
      }
    }else{
      objects.push(pred);
    }
    Cookies.set('matches',JSON.stringify(objects));
  }

  static removePrediction(predId: number): void {
    const matches = Cookies.get('matches');
    if (matches){
      const objects = JSON.parse(matches) as PredictionProps[];
      const filteredObjects = objects.filter(obj => obj.id !== predId)
      Cookies.set('matches',JSON.stringify(filteredObjects));
    }
  }

  static selectedPredictionPref(predId: number) : string {
    const matches = Cookies.get('matches');
    if (matches){
      const objects = JSON.parse(matches) as PredictionProps[];
      const match = objects.find(obj => obj.id === predId);
      if (match){
        return getPreferenceFromPred(match.title,match.pred);
      }
      return ''
    }
    return ''
  }
}



