//
//  GatherViewController.h
//  Transform
//
//  Created by Kevin Liang on 5/31/14.
//  Copyright (c) 2014 Code4Kingdom. All rights reserved.
//

#import "WebContentViewController.h"
#import <MessageUI/MessageUI.h>

@interface GatherViewController : WebContentViewController <MFMessageComposeViewControllerDelegate>

- (IBAction)shareAction:(id)sender;

@end
