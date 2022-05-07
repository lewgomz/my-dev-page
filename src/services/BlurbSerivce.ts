import { BlurbConfigs, LittleBlurbConfigs, BlurbConfig } from '../components/blurp/BlurpConfigs';

export class BlurbService {
    constructor() {
        console.log('BlurbService: connect to some endpoint and set up auth');
    }

    /**
     * getAllBlurbs
     */
    public getAllBlurbs(): BlurbConfig[] {
        return BlurbConfigs;
    }

    public getAllLittleBlurbs() {
        return LittleBlurbConfigs;
    }

    /**
     * getLittleBurb
     * add in some super useful debugging statements
     * return blurb
     */
    public getLittleBurb(id: string) {
        return this.getAllLittleBlurbs().find(littleBlurb => littleBlurb.id === id);
    }

    /**
     * getBlurb
     * add in some super useful debugging statements
     * return blurb
     */
     public getBlurb(id: string) {
        return this.getAllBlurbs().find(blurb => blurb.id === id);
    }
}