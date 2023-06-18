import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1686748394283 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "INSERT INTO `social_platform` (`id`,`name`) VALUES (1, 'KAKAO');",
        );
        await queryRunner.query(
            "INSERT INTO `social_platform` (`id`,`name`) VALUES (2, 'NAVER');",
        );
        await queryRunner.query(
            "INSERT INTO `social_platform` (`id`,`name`) VALUES (3, 'GOOGLE');",
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
