import React from 'react'
import { ReactElement } from 'react';
import { CloseIcon, SendIcon, SendIconMatch } from '../../components/icons';
import HearthMatchIcon from '../../components/icons/heartMatchIcon';
import styles from './match.module.scss'
enum etype {
  LARGE = "large",
  MEDIUM = "medium",
  SMALL = "small",
}
export default function Match() {
  return (
    <section className={styles.contanier}>
        <div className={styles.header}>
            <CloseIcon color="white"/>
        </div>
        <div className={styles.body}>
            <div className={styles.photo}>
                <div className={[styles.union,styles.union_1].join(' ')}>
                    <HearthMatchIcon isLeft={false} type = {etype.LARGE} />
                </div>
                <div className={[styles.union,styles.union_2].join(' ')}>
                    <HearthMatchIcon isLeft={true} type = {etype.MEDIUM} />
                </div>
                <div className={styles.union_around}>
                    <HearthMatchIcon isLeft={true} type = {etype.LARGE} />
                    <HearthMatchIcon isLeft={false} type = {etype.MEDIUM} />
                    <HearthMatchIcon isLeft={false} type = {etype.SMALL} />
                </div>
                <div className={styles.avatars}>
                    <div className={styles.avatars__left}>
                        <img src="https://picsum.photos/id/1027/300/300"  alt="the face of a beautiful girl"/>
                        <div className={styles.heart_1}></div>
                    </div>
                    <div className={styles.avatars__right}>
                        <img src="https://picsum.photos/id/1027/300/300"  alt="the face of a beautiful girl"/>
                        <div className={styles.heart_1}></div>
                    </div>
                </div>
                <div className={[styles.union_around,styles.union_around__mg].join(" ")}>
                    <HearthMatchIcon isLeft={true} type = {etype.LARGE} />
                    <HearthMatchIcon isLeft={false} type = {etype.MEDIUM} />
                    <HearthMatchIcon isLeft={false} type = {etype.LARGE} />
                </div>
                <div className={[styles.union_3].join(' ')}>
                    <HearthMatchIcon isLeft={true} type = {etype.SMALL} />
                </div>
                <div className={[styles.union_4].join(' ')}>
                    <HearthMatchIcon isLeft={true} type = {etype.MEDIUM} />
                </div>
            </div>
            <div className={styles.title}>
                <p>It’s a match</p> 
            </div>
            <div className={styles.text}>
                <p>Đừng để cô ấy phải chờ đợi,<br/>gửi lời chào ngay!</p>
            </div>
        </div>
        <div className={styles.footer}>
            <div className={styles.input}>
                <input type="text" placeholder='Gửi lời chào'/>
                <div className={styles.icon}>
                    <SendIconMatch/>
                </div>
            </div>
            <div className={styles.skip}>
                <p>Skip</p>
            </div>
        </div>
    </section>
  )
}

Match.getLayout = function getLayout(page: ReactElement) {
	return <>{page}</>;
};