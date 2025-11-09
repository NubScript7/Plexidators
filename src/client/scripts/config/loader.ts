export type loaderConf = {
    models: modelObj[]
}

export type modelObj = {
    type: "gltf",
    name: string
    url: string
}

export const loaderConfig: loaderConf = {
    models: [
        {
            type: "gltf",
            name: "playerModel",
            url: "/assets/models/player.glb"
        },
        {
            type: "gltf",
            name: "mapModel",
            url: "/assets/models/fpsMap.glb"
        }
    ]
}