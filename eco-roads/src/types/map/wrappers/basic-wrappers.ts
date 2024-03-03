import Feature from "ol/Feature";

export interface IFeatureWrapper {
    id: string;
    groupId?: string;
    isActive?: boolean;
    feature: Feature;
}