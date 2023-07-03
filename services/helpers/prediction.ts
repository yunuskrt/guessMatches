import MatchProps from '@models/match'
import PredictionProps from '@models/prediction'

export const getPredictionFromMatch = (match:MatchProps, pref:string) : PredictionProps => {
	const ind = pref.indexOf('-')
    let title : string;

	const tit = pref.substring(0, ind)
    if (tit ===  "ms")
        title = "Mac Sonucu"
    else if (tit === "cfs")
        title = "Cifte Sans"
    else if (tit === "hms10")
        title = "Handikapli Mac Sonucu (1:0)"
    else if (tit === "hms01")
        title = "Handikapli Mac Sonucu (0:1)"
    else if (tit === "tgau")
        title = "Toplam Gol Alt/Ust"
    else if (tit === "kg")
        title = "Karsilikli Gol"
    else // tg
        title = "Toplam Gol"
    
	const pred = pref.substring(ind + 1, pref.length)

    return {
        title: title,
        pred: pred,
        ...match
    }
	
}
export const getPreferenceFromPred = (title: string, pred: string) : string => {
    switch (title) {
        case "Mac Sonucu":
            switch(pred) {
                case "1":
                    return "ms-1"
                case "0":
                    return "ms-0"
                default: // "2"
                    return "ms-2"
            }
        case "Cifte Sans":
            switch(pred) {
                case "1-X":
                    return "cfs-1-X"
                case "1-2":
                    return "cfs-1-2"
                default: // "x-2"
                    return "cfs-X-2"
            }
        case "Handikapli Mac Sonucu (1:0)":
            switch(pred) {
                case "1":
                    return "hms10-1"
                case "0":
                    return "hms10-0"
                default: // "2"
                    return "hms10-2"
            }
        case "Handikapli Mac Sonucu (0:1)":
            switch(pred) {
                case "1":
                    return "hms01-1"
                case "0":
                    return "hms01-0"
                default: // "2"
                    return "hms01-2"
            }
        case "Toplam Gol Alt/Ust":
            switch(pred) {
                case "Alt":
                    return "tgau-Alt"
                default: // "Ust"
                    return "tgau-Ust"
            }
        case "Karsilikli Gol":
            switch(pred) {
                case "Var":
                    return "kg-Var"
                default: // "yok"
                    return "kg-Yok"
            }
        default: // Toplam Gol
            switch(pred) {
                case "0-2":
                    return "tg-0-2"
                case "3-5":
                    return "tg-3-5"
                default: // "6+"
                    return "tg-6+"
            }

    }
}