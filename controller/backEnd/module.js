import {
    queryContactAll,
    addSlide,
    querySlide,
    delSlide,
    querySlideOne,
    updateSlide
} from '../../models/modules'

const slider = async (ctx, next) => {
    const slider1 = await querySlide(0);
    const slider2 = await querySlide(1);
    const slider3 = await querySlide(2);
    const slider4 = await querySlide(3);
    await ctx.render('backEnd/slider', {
        title: 'slider',
        slider1: slider1,
        slider2: slider2,
        slider3: slider3,
        slider4: slider4
    })
};

const sliderAdd = async(ctx, next) => {
    const { id, type } = ctx.params
    console.log(type)
    var opt = {};
    if (id) {
        opt = await querySlideOne(id)
        opt = opt[0];
    }
    await ctx.render('backEnd/sliderAdd',{
        title: '添加轮播',
        id: id ? id : '',
        image: id ? opt.cover : '',
        video: id ? opt.video : '',
        pType: type,
        slide: opt
    })
}

const sliderInsert = async (ctx, next) => {
    const { mainTitle, subTitle, cover, foreignChain, video, type } = ctx.request.body
    await addSlide(mainTitle, subTitle, cover, foreignChain, video, type)
    ctx.response.status = 200;
    ctx.response.body = {
        code: 0,
        msg: 'success'
    }
};

const slderDel = async(ctx, next) => {
    const { id } = ctx.request.body
    console.log(id)
    await delSlide(id);
    ctx.response.status = 200;
    ctx.response.body = {
        code: 0,
        msg: 'success'
    }
}

const sliderUpdate = async (ctx, next) => {
    const { id, mainTitle, subTitle, cover, foreignChain, video, type } = ctx.request.body
    await updateSlide(id, mainTitle, subTitle, cover, foreignChain, video)
    ctx.response.status = 200;
    ctx.response.body = {
        code: 0,
        msg: 'success'
    }
};

const contact = async (ctx, next) => {
    const result = await queryContactAll();
    await ctx.render('backEnd/contact', {
        contact: result,
        title: 'contact'
    })
};

export default (router) => {
    router
        .get('/module/slider', slider)
        .del('/module/slider', slderDel)
        .get('/module/slider/add/:type', sliderAdd)
        .get('/module/slider/add/:type/:id', sliderAdd)
        .post('/module/slider/add', sliderInsert)
        .put('/module/slider/add', sliderUpdate)
        .get('/module/contact', contact)
}
