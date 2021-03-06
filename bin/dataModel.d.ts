export interface cuteJson {
    project: string;
    scenes: cuteScenes[];
}
export interface cuteScenes {
    name: string;
    backgroundColors?: number[];
}
export declare class Convert {
    static toCuteJSON(json: string): cuteJson;
}
//# sourceMappingURL=dataModel.d.ts.map