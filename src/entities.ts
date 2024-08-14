import kaboom, { AreaComp, BodyComp, DoubleJumpComp, GameObj, HealthComp, KaboomCtx, OpacityComp, PosComp, ScaleComp, SpriteComp } from "kaboom";
import { scale } from "./constants";

type PlayerGameObj = GameObj<
    SpriteComp &
    AreaComp &
    BodyComp &
    PosComp &
    ScaleComp &
    DoubleJumpComp &
    HealthComp &
    OpacityComp & {
        speed: number;
        direction: "left" | "right";
        isInhaling: boolean;
        isFull: boolean;
    }
>;

export function makePlayer(k: KaboomCtx, posX: number, posy: number) {
    const player = k.add([
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
            direction: "left",
            isInhaling: false,
            isFull: false,
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
        if (player.hp() === 0) {
            k.destroy(player);
            k.go("level-1");
            return;
        }

        player.hurt();
        await k.tween(
            player.opacity,
            0,
            0.05,
            (val) => (player.opacity = val),
            k.easings.linear
        );
        await k.tween(
            player.opacity,
            1,
            0.05,
            (val) => (player.opacity = val),
            k.easings.linear
        );
    });

    player.onCollide("exit", () => {
        k.go("level-1");
    });

    const inhaleEffect = k.add([
        k.sprite("assets", { anim: "kirbInhaleEffect" }),
        k.pos(),
        k.scale(scale),
        k.opacity(0),
        "inhaleEffect",
    ]);

    const inhaleZone = player.add([
        k.area({ shape: new k.Rect(k.vec2(0), 20, 4) }),
        k.pos(),
        "inhaleZone",
    ]);

    inhaleZone.onUpdate(() => {
        if (player.direction === "left") {
            inhaleZone.pos = k.vec2(-14, 8);
            inhaleEffect.pos = k.vec2(player.pos.x - 60, player.pos.y + 0);
            inhaleEffect.flipX = true;
            return;
        }
        inhaleZone.pos = k.vec2(14, 8);
        inhaleEffect.pos = k.vec2(player.pos.x + 60, player.pos.y + 0);
        inhaleEffect.flipX = false;
    });

    player.onUpdate(() => {
        if (player.pos.y > 2000) {
            k.go("level-1");
        }
    });

    return player;
}


export function setControls(k: KaboomCtx, player: PlayerGameObj) {
    const inhaleEffectRef = k.get("inhaleEffect")[0];

    k.onKeyDown((key) => {
        switch (key) {
            case "left":
                player.direction = "left";
                player.flipX(true);
                player.move(-player.speed, 0);
                break;
            case "right":
                player.direction = "right";
                player.flipX(false);
                player.move(player.speed, 0);
                break;
            case "z":
                if (player.isFull) {
                    player.play("kirbFull");
                    inhaleEffectRef.opacity = 0;
                    break;
                }

                player.isInhaling = true;
                player.play("kirbInhaling");
                inhaleEffectRef.opacity = 1;
                break;
            default:
        }
    });

    k.onKeyPress((key) => {
        switch (key) {
            case "x":
                player.doubleJump();
                break;
            default:
        }
    });

    k.onKeyRelease((key) => {
        if (key === "z") {
            if (player.isFull) {
                player.play("kirbInhaling");
                const shootingStar = k.add([
                    k.sprite("assets", { anim: "shootingStar" }),
                    k.area({ shape: new k.Rect(k.vec2(5, 4), 6, 6) }),
                    k.pos(
                        player.direction === "left"
                            ? player.pos.x - 80
                            : player.pos.x + 80,
                        player.pos.y + 5
                    ),
                    k.scale(scale),
                    k.move(
                        player.direction === "left" ? k.LEFT : k.RIGHT,
                        800
                    ),
                    "shootingStar",
                ]);
                shootingStar.onCollide("platform", () => {
                    k.destroy(shootingStar);
                });
                player.isFull = false;
                k.wait(1, () => player.play("kirbIdle"));
                return;
            }
            inhaleEffectRef.opacity = 0;
            player.isInhaling = false;
            player.play("kirbIdle");
        }
    });

}

export function makeFlameEnemy(k: KaboomCtx, posX: number, posY: number) {
    const flame = k.add([
        k.sprite("assets", { anim: "flame" }),
        k.scale(scale),
        k.pos(posX * scale, posY * scale),
        k.area({
            shape: new k.Rect(k.vec2(4, 6), 8, 10),
            collisionIgnore: ["enemy"],
        }),
        k.body(),
        k.state("idle", ["idle", "jump"]),
        "enemy",
    ]);
    flame.onStateEnter("idle", async()=>{
        await k.wait(1, ()=>{
            flame.play("jump");
        });
        flame.enterState("jump",async ()=>{
            flame.jump(1000);
        });
        flame.onState
    })
}

