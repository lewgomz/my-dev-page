import { BlurbConfigs, LittleBlurbConfigs, BlurbConfig } from '../components/blurp/BlurpConfigs';

export class BlurbService {
    public getAllBlurbs(): BlurbConfig[] {
        return BlurbConfigs;
    }

    public getAllLittleBlurbs() {
        return LittleBlurbConfigs;
    }

    public getLittleBlurb(id: string) {
        return this.getAllLittleBlurbs().find(littleBlurb => littleBlurb.id === id);
    }

    public getBlurb(id: string) {
        return this.getAllBlurbs().find(blurb => blurb.id === id);
    }
}
