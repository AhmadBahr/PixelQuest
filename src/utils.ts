import { KaboomCtx } from "kaboom";
import { scale } from "./constants"

export async function makeMap(k: KaboomCtx, name: string) {
    const mapData = await (await fetch(`./${name}.json`)).json();

    const map = k.make([k.sprite(name), k.scale(scale), k.pos(0)])

    const spawnPoints: { [key: string]: { x: number, y: number } } = {};

    for ( const layer of mapData.layers) {
        if (layer.name === "colliders") {
            for (const obj of layer.objects) {
                spawnPoints[obj.name] = k.vec2(obj.x, obj.y);
            }
        }
    }
}