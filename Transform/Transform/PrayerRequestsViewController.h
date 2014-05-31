//
//  PrayerRequestsViewController.h
//  Transform
//
//  Created by Kevin Liang on 5/31/14.
//  Copyright (c) 2014 Code4Kingdom. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface PrayerRequestsViewController : UIViewController <UIWebViewDelegate>
@property (weak, nonatomic) IBOutlet UIWebView *contentWebView;
@property (nonatomic, strong) NSString *currentUrlName;

@end
