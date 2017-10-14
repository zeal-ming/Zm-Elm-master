/**
 * Created by intern on 2017/9/15.
 */

// 获得图片链接
export const mixin = {

    methods:{

        getImgUrl: function (hash, size) {

            //获取第一个字符,第二三字符,最后三个字符

            let dir1 = hash.substring(0, 1);

            let dir2 = hash.substring(1, 3);

            let img = '';


            if(hash.substring(hash.length - 4) === 'jpeg'){

                 img = hash.substring(hash.length - 4);


            } else {

                img = hash.substring(hash.length - 3);

            }

            let strContent = hash.substr(3);


            //https://fuss10.elemecdn.com/f/b8/6fe12681eb97d9c7013ece81af62bjpeg.jpeg?imageMogr/thumbnail/!90x90r/gravity/Center/crop/90x90

            const url = 'https://fuss10.elemecdn.com/' + dir1 + '/' + dir2 + '/' + strContent + '.' + img + '?imageMogr/thumbnail/!' + size + 'r/gravity/Center/crop/' + size + '/';

            // console.log(url);
            return url;
        },

        getImgUrl2: function (hash, size) {

            //获取第一个字符,第二三字符,最后三个字符

            let dir1 = hash.substring(0, 1);

            let dir2 = hash.substring(1, 3);

            let img = hash.substring(hash.length - 4);

            let strContent = hash.substr(3);

            const url = 'https://fuss10.elemecdn.com/' + dir1 + '/' + dir2 + '/' + strContent + '.' + img + '?imageMogr/thumbnail/!' + size + 'r/gravity/Center/crop/' + size + '/';

            return url;
            console.log('haha',url);
        },

        getBackgroundImgUrl: function (hash) {

            let dir1 = hash.substring(0, 1);

            let dir2 = hash.substring(1, 3);

            let img = '';

            if(hash.substring(hash.length - 4) === 'jpeg'){

                img = hash.substring(hash.length - 4);

            } else {

                img = hash.substring(hash.length - 3);
            }

            let strContent = hash.substr(3);

            //覆盖背景url:background-image: url("https://fuss10.elemecdn.com/f/8d/f29dbf20be425fc12426c0b1f90b7jpeg.jpeg?imageMogr/format/webp/thumbnail/!40p/blur/50x40/");

            const url = "url('"+'https://fuss10.elemecdn.com/' + dir1 + '/' + dir2 + '/' + strContent + '.' + img + '?imageMogr/format/webp/thumbnail/!40p/blur/50x40/'+ "')";

            //console.log(url);
            return url;
        }

    }

};


