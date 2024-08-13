import { GameObj, KaboomCtx } from "kaboom";
import { scale } from "./constants";

export function makePlayer(k: KaboomCtx, posX: number, posy: number) {
    const player = k.make([
        k.sprite("assets", { anim: "kirbIdle" }),
        k.area({ shape: new k.Rect(k.vec2(4, 5.9), 284, 10) }),
        k.body(),
        k.pos(posX * scale, posy * scale),
        k.scale(scale),
        k.doubleJump(3),
        k.health(3),
        k.opacity(1),
        {
            speed: 300,
            direction: "right",
            isInhaling: false,
            isFull: false
        },
        "player",
    ]);
    player.onCollide("enemy", async (enemy: GameObj) => {
        if (player.isInhaling && enemy.isInhable) {
            player.isInhaling = false;
            k.destroy(enemy);
            player.isFull = true;
            return;
        }
    });
}