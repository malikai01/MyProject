package com.mlk.home.common.utils;
import java.text.DateFormat;
import java.util.Date;
import java.util.TimeZone;

/**
 * TimeZone的测试程序
 */
public class TimeZoneTest {

    public static void main(String[] args) {

        // 测试创建TimeZone对象的3种方法
        showUsageOfTimeZones() ;

        // 测试TimeZone的其它API
        testOtherAPIs() ;

        // 打印getTimeZone(String id)支持的所有id
        printAllTimeZones() ;
    }


    /**
     * 测试创建TimeZone对象的3种方法
     */
    public static void showUsageOfTimeZones() {
        TimeZone tz;

        // (01) 默认时区
        tz = TimeZone.getDefault();
        printDateIn(tz) ;

        // (02) 设置时区为"GMT+08:00"
        tz = TimeZone.getTimeZone("GMT+08:00");
        printDateIn(tz) ;

        // (03) 设置时区为""
        tz = TimeZone.getTimeZone("Asia/Chongqing");
        printDateIn(tz) ;
    }

    /**
     * 打印 tz对应的日期/时间
     */
    private static void printDateIn(TimeZone tz) {
        // date为2013-09-19 14:22:30
        Date date =  new Date();
        // 获取默认的DateFormat，用于格式化Date
        DateFormat df = DateFormat.getInstance();
        // 设置时区为tz
        df.setTimeZone(tz);
        // 获取格式化后的字符串
        String str = df.format(date);

        System.out.println(tz.getID()+" :"+str);
    }

    /**
     * 测试TimeZone的其它API
     */
    public static void testOtherAPIs() {
        // 默认时区
        TimeZone tz = TimeZone.getDefault();

        // 获取“id”
        String id = tz.getID();

        // 获取“显示名称”
        String name = tz.getDisplayName();

        // 获取“时间偏移”。相对于“本初子午线”的偏移，单位是ms。
        int offset = tz.getRawOffset();
        // 获取“时间偏移” 对应的小时
        int gmt = offset/(3600*1000);
        TimeZone tz1 = TimeZone.getTimeZone("Africa/Bamako");
        int offset1 = tz1.getRawOffset();
        int gmt1 = offset1/(3600*1000);
        String id1 = tz1.getID();

        // 获取“显示名称”
        String name1 = tz1.getDisplayName();
        System.out.printf("id=%s, name=%s, offset=%s(ms), gmt=%s\n",
                id1, name1, offset1, gmt1);
        System.out.printf("id=%s, name=%s, offset=%s(ms), gmt=%s\n",
                id, name, offset, gmt);
    }

    /**
     * 打印getTimeZone(String id)支持的所有id
     */
    public static void printAllTimeZones() {

        String[] ids = TimeZone.getAvailableIDs();
        for (String id:ids) {
            //int offset = TimeZone.getTimeZone(avaIds[i]).getRawOffset();
            //System.out.println(i+" "+avaIds[i]+" "+offset / (3600 * 1000) + "\t");
            System.out.printf(id+", ");
        }
        System.out.println();
    }
}