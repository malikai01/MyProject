package com.mlk.home.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.mlk.home.entity.TakeNames;
import com.mlk.home.search.TakeNamesModel;
import com.mlk.home.service.TakeNamesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Created by malikai on 2018-7-9.
 */
@Controller
@RequestMapping("v1/takeNames")
public class TakeNamesController {
    @Reference
    private TakeNamesService takeNamesService;
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    @ResponseBody
    public boolean addNames(@RequestBody TakeNames names){
        return takeNamesService.addNnames(names);
    }
    @RequestMapping(value = "/query",method = RequestMethod.POST)
    @ResponseBody
    public TakeNames queryNames(@RequestBody TakeNamesModel model){
        return takeNamesService.queryNames(model);
    }
}
