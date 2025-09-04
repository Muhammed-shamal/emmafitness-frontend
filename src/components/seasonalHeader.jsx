import { getSeason, } from '../utility/Season/getSeason'
import {seasonThemes} from '../utility/Season/seasonTheme'

const SeasonalHeader = () => {
    const season = getSeason();
    const theme = seasonThemes[season];

   return (
        <div className={`w-full py-4 bg-gradient-to-r ${theme.gradient} flex items-center justify-center`}>
            <div className="text-center px-4">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                    Trending this <span className={`${theme.textColor} font-bold`}>{season}</span>
                </h2>
                <p className="text-sm text-gray-600 mt-1">Discover the season&apos;s most wanted items</p>
            </div>
            <div className="text-2xl ml-2 hidden md:block">
                {theme.emoji}
            </div>
        </div>
    );
};

export default SeasonalHeader;